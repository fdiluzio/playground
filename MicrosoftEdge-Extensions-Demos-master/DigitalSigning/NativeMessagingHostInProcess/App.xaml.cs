﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.ApplicationModel;
using Windows.ApplicationModel.Activation;
using Windows.ApplicationModel.AppService;
using Windows.ApplicationModel.Background;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Popups;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

namespace NativeMessagingHostInProcess
{
    /// <summary>
    /// Provides application-specific behavior to supplement the default Application class.
    /// </summary>
    sealed partial class App : Application
    {
        private BackgroundTaskDeferral appServiceDeferral = null;
        private AppServiceConnection connection = null;
        private BackgroundTaskDeferral centennialAppServiceDeferral = null;
        private AppServiceConnection centennialConnection = null;
        private bool centennialAppLaunched = true;
        private int currentConnectionIndex = 0;

        static int connectionIndex = 0;
        static int centennialConnectionIndex = 0;
        static Dictionary<int, AppServiceConnection> connections = new Dictionary<int, AppServiceConnection>();
        static Dictionary<int, AppServiceConnection> centennialConnections = new Dictionary<int, AppServiceConnection>();
        static Dictionary<int, BackgroundTaskDeferral> appServiceDeferrals = new Dictionary<int, BackgroundTaskDeferral>();
        static Dictionary<int, BackgroundTaskDeferral> centennialAppServiceDeferrals = new Dictionary<int, BackgroundTaskDeferral>();
        static Object thisLock = new Object();

        /// <summary>
        /// Initializes the singleton application object.  This is the first line of authored code
        /// executed, and as such is the logical equivalent of main() or WinMain().
        /// </summary>
        public App()
        {
            this.InitializeComponent();
            this.Suspending += OnSuspending;
        }

        /// <summary>
        /// Initializes the app service on the host process 
        /// </summary>
        protected async override void OnBackgroundActivated(BackgroundActivatedEventArgs args)
        {
            base.OnBackgroundActivated(args);
            IBackgroundTaskInstance taskInstance = args.TaskInstance;
            if (taskInstance.TriggerDetails is AppServiceTriggerDetails)
            {
                AppServiceTriggerDetails appService = taskInstance.TriggerDetails as AppServiceTriggerDetails;

                if (appService.CallerPackageFamilyName == Windows.ApplicationModel.Package.Current.Id.FamilyName) // App service connection from Centennial App
                {
                    this.centennialAppServiceDeferral = taskInstance.GetDeferral(); // Get a deferral so that the service isn't terminated.
                    taskInstance.Canceled += OnCentennialAppServicesCanceled; // Associate a cancellation handler with the background task.
                    this.centennialConnection = appService.AppServiceConnection;
                    this.centennialConnection.RequestReceived += OnCentennialAppServiceRequestReceived;
                    this.centennialConnection.ServiceClosed += CentennialAppServiceConnection_ServiceClosed;

                    lock (thisLock)
                    {
                        this.centennialConnection.AppServiceName = centennialConnectionIndex.ToString();
                        centennialConnections.Add(centennialConnectionIndex, this.centennialConnection);
                        centennialAppServiceDeferrals.Add(centennialConnectionIndex, this.centennialAppServiceDeferral);
                        centennialConnectionIndex++;
                    }
                }
                else // App service connection from Edge browser
                {
                    this.appServiceDeferral = taskInstance.GetDeferral(); // Get a deferral so that the service isn't terminated.
                    taskInstance.Canceled += OnAppServicesCanceled; // Associate a cancellation handler with the background task.
                    this.connection = appService.AppServiceConnection;
                    this.connection.RequestReceived += OnAppServiceRequestReceived;
                    this.connection.ServiceClosed += AppServiceConnection_ServiceClosed;

                    lock (thisLock)
                    {
                        this.connection.AppServiceName = connectionIndex.ToString();
                        connections.Add(connectionIndex, this.connection);
                        appServiceDeferrals.Add(connectionIndex, this.appServiceDeferral);
                        connectionIndex++;
                    }

                    try
                    {
                        // Make sure the BackgroundProcess is in your AppX folder, if not rebuild the solution
                        await Windows.ApplicationModel.FullTrustProcessLauncher.LaunchFullTrustProcessForCurrentAppAsync();
                    }
                    catch (Exception)
                    {
                        this.centennialAppLaunched = false;
                        MessageDialog dialog = new MessageDialog("Rebuild the solution and make sure the BackgroundProcess is in your AppX folder");
                        await dialog.ShowAsync();
                    }
                }
            }
        }

        /// <summary>
        /// Receives message from Extension (via Edge)
        /// </summary>
        private async void OnAppServiceRequestReceived(AppServiceConnection sender, AppServiceRequestReceivedEventArgs args)
        {
            AppServiceDeferral messageDeferral = args.GetDeferral();

            try
            {
                if (this.centennialAppLaunched)
                {
                    this.currentConnectionIndex = Int32.Parse(sender.AppServiceName);
                    this.centennialConnection = centennialConnections[this.currentConnectionIndex];

                    // Send message to the Centennial component and wait for response
                    AppServiceResponse centennialResponse = await this.centennialConnection.SendMessageAsync(args.Request.Message);
                    await args.Request.SendResponseAsync(centennialResponse.Message);
                }
                else
                {
                    throw new Exception("Failed to launch Centennial App!");
                }
            }
            finally
            {
                messageDeferral.Complete();
            }
        }

        /// <summary>
        /// Associate the cancellation handler with the background task 
        /// </summary>
        private void OnAppServicesCanceled(IBackgroundTaskInstance sender, BackgroundTaskCancellationReason reason)
        {
            AppServiceTriggerDetails appService = sender.TriggerDetails as AppServiceTriggerDetails;
            this.currentConnectionIndex = Int32.Parse(appService.AppServiceConnection.AppServiceName);
            this.centennialConnection = centennialConnections[this.currentConnectionIndex];
            this.centennialConnection.Dispose();
            centennialConnections.Remove(this.currentConnectionIndex);

            this.appServiceDeferral = appServiceDeferrals[this.currentConnectionIndex];
            appServiceDeferrals.Remove(this.currentConnectionIndex);
            this.centennialAppServiceDeferral = centennialAppServiceDeferrals[this.currentConnectionIndex];
            centennialAppServiceDeferrals.Remove(this.currentConnectionIndex);
            if (this.appServiceDeferral != null)
            {
                this.appServiceDeferral.Complete();
                this.appServiceDeferral = null;
            }
            if (this.centennialAppServiceDeferral != null)
            {
                this.centennialAppServiceDeferral.Complete();
                this.centennialAppServiceDeferral = null;
            }
        }

        /// <summary>
        /// Occurs when the other endpoint closes the connection to the app service
        /// </summary>
        private void AppServiceConnection_ServiceClosed(AppServiceConnection sender, AppServiceClosedEventArgs args)
        {
            this.currentConnectionIndex = Int32.Parse(sender.AppServiceName);
            this.centennialConnection = centennialConnections[this.currentConnectionIndex];
            this.centennialConnection.Dispose();
            centennialConnections.Remove(this.currentConnectionIndex);

            this.appServiceDeferral = appServiceDeferrals[this.currentConnectionIndex];
            appServiceDeferrals.Remove(this.currentConnectionIndex);
            this.centennialAppServiceDeferral = centennialAppServiceDeferrals[this.currentConnectionIndex];
            centennialAppServiceDeferrals.Remove(this.currentConnectionIndex);
            if (this.appServiceDeferral != null)
            {
                this.appServiceDeferral.Complete();
                this.appServiceDeferral = null;
            }
            if (this.centennialAppServiceDeferral != null)
            {
                this.centennialAppServiceDeferral.Complete();
                this.centennialAppServiceDeferral = null;
            }
        }

        /// <summary>
        /// Receives message from Centennial App
        /// </summary>
        private async void OnCentennialAppServiceRequestReceived(AppServiceConnection sender, AppServiceRequestReceivedEventArgs args)
        {
            AppServiceDeferral messageDeferral = args.GetDeferral();

            try
            {
                this.currentConnectionIndex = Int32.Parse(sender.AppServiceName);
                this.connection = connections[this.currentConnectionIndex];

                await this.connection.SendMessageAsync(args.Request.Message);
            }
            finally
            {
                messageDeferral.Complete();
            }
        }

        /// <summary>
        /// Associate the cancellation handler with the background task 
        /// </summary>
        private void OnCentennialAppServicesCanceled(IBackgroundTaskInstance sender, BackgroundTaskCancellationReason reason)
        {
            AppServiceTriggerDetails appService = sender.TriggerDetails as AppServiceTriggerDetails;
            this.currentConnectionIndex = Int32.Parse(appService.AppServiceConnection.AppServiceName);
            this.connection = connections[this.currentConnectionIndex];
            this.connection.Dispose();
            connections.Remove(this.currentConnectionIndex);

            this.appServiceDeferral = appServiceDeferrals[this.currentConnectionIndex];
            appServiceDeferrals.Remove(this.currentConnectionIndex);
            this.centennialAppServiceDeferral = centennialAppServiceDeferrals[this.currentConnectionIndex];
            centennialAppServiceDeferrals.Remove(this.currentConnectionIndex);
            if (this.appServiceDeferral != null)
            {
                this.appServiceDeferral.Complete();
                this.appServiceDeferral = null;
            }
            if (this.centennialAppServiceDeferral != null)
            {
                this.centennialAppServiceDeferral.Complete();
                this.centennialAppServiceDeferral = null;
            }
        }

        /// <summary>
        /// Occurs when the other endpoint closes the connection to the app service
        /// </summary>
        private void CentennialAppServiceConnection_ServiceClosed(AppServiceConnection sender, AppServiceClosedEventArgs args)
        {
            this.currentConnectionIndex = Int32.Parse(sender.AppServiceName);
            this.connection = connections[this.currentConnectionIndex];
            this.connection.Dispose();
            connections.Remove(this.currentConnectionIndex);

            this.appServiceDeferral = appServiceDeferrals[this.currentConnectionIndex];
            appServiceDeferrals.Remove(this.currentConnectionIndex);
            this.centennialAppServiceDeferral = centennialAppServiceDeferrals[this.currentConnectionIndex];
            centennialAppServiceDeferrals.Remove(this.currentConnectionIndex);
            if (this.appServiceDeferral != null)
            {
                this.appServiceDeferral.Complete();
                this.appServiceDeferral = null;
            }
            if (this.centennialAppServiceDeferral != null)
            {
                this.centennialAppServiceDeferral.Complete();
                this.centennialAppServiceDeferral = null;
            }
        }

        /// <summary>
        /// Invoked when the application is launched normally by the end user.  Other entry points
        /// will be used such as when the application is launched to open a specific file.
        /// </summary>
        /// <param name="e">Details about the launch request and process.</param>
        protected override void OnLaunched(LaunchActivatedEventArgs e)
        {
#if DEBUG
            if (System.Diagnostics.Debugger.IsAttached)
            {
                this.DebugSettings.EnableFrameRateCounter = true;
            }
#endif
            Frame rootFrame = Window.Current.Content as Frame;

            // Do not repeat app initialization when the Window already has content,
            // just ensure that the window is active
            if (rootFrame == null)
            {
                // Create a Frame to act as the navigation context and navigate to the first page
                rootFrame = new Frame();

                rootFrame.NavigationFailed += OnNavigationFailed;

                if (e.PreviousExecutionState == ApplicationExecutionState.Terminated)
                {
                    //TODO: Load state from previously suspended application
                }

                // Place the frame in the current Window
                Window.Current.Content = rootFrame;
            }

            if (e.PrelaunchActivated == false)
            {
                if (rootFrame.Content == null)
                {
                    // When the navigation stack isn't restored navigate to the first page,
                    // configuring the new page by passing required information as a navigation
                    // parameter
                    rootFrame.Navigate(typeof(MainPage), e.Arguments);
                }
                // Ensure the current window is active
                Window.Current.Activate();
            }
        }

        /// <summary>
        /// Invoked when Navigation to a certain page fails
        /// </summary>
        /// <param name="sender">The Frame which failed navigation</param>
        /// <param name="e">Details about the navigation failure</param>
        void OnNavigationFailed(object sender, NavigationFailedEventArgs e)
        {
            throw new Exception("Failed to load Page " + e.SourcePageType.FullName);
        }

        /// <summary>
        /// Invoked when application execution is being suspended.  Application state is saved
        /// without knowing whether the application will be terminated or resumed with the contents
        /// of memory still intact.
        /// </summary>
        /// <param name="sender">The source of the suspend request.</param>
        /// <param name="e">Details about the suspend request.</param>
        private void OnSuspending(object sender, SuspendingEventArgs e)
        {
            var deferral = e.SuspendingOperation.GetDeferral();
            //TODO: Save application state and stop any background activity
            deferral.Complete();
        }
    }
}
