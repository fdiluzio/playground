export default class Constants {
  constructor () {
    this.constants = {
      APP_NAME: "searchbar",
      connector: {
        params: {
          AUTH_TOKEN: "auth-token"
        }
      },
      FACET_VALUE_SEPARATOR_REGEX: /\u001f/g,
      FACET_VALUE_SEPARATOR: '\u001f',
      categorytypes: {
          AUTOCOMPLETE: "autocomplete",
          FILTER:"filter",
          LAST_SEARCHES: "lastsearches",
          PEOPLE: "people",
          SYNONYMS: "synonyms",
          SWYT: "swyt",
          TRANSLATIONS: "translations"
      },
      requesttypes: {
          AUTOCOMPLETE: "autocomplete",
          DID_YOU_MEAN: "didyoumean",
          DOCUMENT_DATA: "documentdata",
          DOCUMENT_DOWNLOAD: "documentdownload",
          FACETS_AND_SEARCH: "facetsandsearch",
          FACET_ENTRIES: "getfacetentries",
          FACETS: "facets",
          FACETS_MORE: "facetsmore",
          FILTER: "filter",
          SEARCH: "search",
          ROLES: "roles",
          SOURCES: "sources",
          WHILE_YOU_TYPE: "whileyoutype",
          CLICK2RANK: "click2rank",
          GETCONFIGURATION: "getconfiguration",
          KNOWLEDGEMAP: "knowledgemap"
      },
      settings: {
        searchType: {
            STANDARD: "standard",
            FIELDBASED: "fieldbased"
        },
        queryfit: {
          S_SEARCH_MODE: "sSearchMode"
        },
        querydistance: {
          S_SEARCH_DISTANCE: "sSearchDistance"
        },
        extendedAutocomplete: {
          AC_EXTEND_SYNONYMS: "acExtendSynonyms",
          AC_EXTEND__TRANSLATIONS: "acExtendTranslations"
        }
      },
      events: {
        ALL_STATIC_DOCLABELS_UPDATED: 'all-static-doclabels-updated',
        APP_LANGUAGE: "app_language",
        APP_STATE_READY: "app_state_ready",
        AUTOCOMPLETE_SELECT: "autocomplete_select",
        AUTOCOMPLETE_UNSELECT: "autocomplete_unselect",
        ACTION_QUERY_TRIGGERED: "action_query_triggered",
        BACK_TO_TOP: "back_to_top",
        BODY_CLICK: "body_click",
        CLEAR_STATE: "clear_state",
        CLOSE_FILTER: "close_filter",
        CLOSE_OTHERS: "close_others",
        DOCLABEL_BATCH_ACTION_CLOSE_MODAL: 'doclabel_batch-action-close-modal',
        DOCLABEL_BATCH_ACTION_PERSIST_UI: 'dlba_persist_ui',
        DOCLABEL_DESELECT_ALL: 'doclabel_deselect_all',
        DUPLICATE_FILTER_RESULT_EVENT_TRIGGERED: "duplicates_filter_result_event_triggered",
        EDIT_STATIC_DOCLABEL: 'static-doclabels-edit',
        FACET_CHANGED: "facet_changed",
        FILTER_BY_DATE_RANGE_TRIGGERED: "filter_by_date_range_triggered",
        ESCAPE_KEY: "escape_key",
        FILTER_SELECTED: "facet_selected",
        FILTER_TOGGLED: "filter_toggled",
        FACETS_UPDATED:'facets_updated',
        FACET_EXPAND_AND_SCROLL_TO: 'facet_expand_and_scroll_to',
        GOOGLE_MAPS_BOUNDS_CHANGED: "bounds_changed",
        GOOGLE_MAPS_GEO_FILTER_CHANGED: "GEO_FILTER_CHANGE",
        GOOGLE_MAPS_INIT: "google_maps_init",
        GOOGLE_MAPS_TOGGLE: "google_maps_toggle",
        GOOGLE_MAPS_UPDATE_RESULT: "update_result",
        INITIAL_RESULT_LIST: 'initial_result_list',
        KNOWLEDGEMAP_STATUS_CHANGE: 'knowledgemap_status_change',
        KNOWLEDGEGRAPH_CLOSE: "knowledgegraphclose",
        MODAL_CLOSED: 'modal_open',
        MODAL_OPEN: 'model_closed',
        NEW_RESULT_LOADED: "new_result_loaded",
        PREVIEW_IMAGE_TRIGGERED: "preview_image_triggered", // dispatches when preview image is triggered
        PREVIEW_TRIGGERED: "preview_triggered", // dispatches when preview is triggered
        PREVIEW_CLOSE: "close_preview_triggered", // dispatches to close preview
        QUERY_RESPONSE_RECEIVED: "query_response_received",
        RANGE_VALUE_CHANGED: 'range_value_changed',
        RESET_FILTERS:"reset_filters",
        RESULT_TARGET_CHANGED: "result_target_changed", // triggered when a the resultlist has changed, for instance, it simulates different tabs
        RESULT_DATA_AVAILABLE: "result_data_available",
        RESULTLIST_HIT_CLICKED: "resultlist_hit_clicked",
        RESULT_LIST_DATA_CHANGE: "result_list_data_change",
        RESULTLIST_RENDERED: "resultlist_rendered",
        RESULTLIST_VIEW_CHANGE: "resultlist_view_change",
        SAVE_QUERY: "save_query",
        SEND_QUERY: "send_query",
        SEARCH_CATEGORY_TRIGGERED: "search_category_triggered", // dispatches when a search on category is triggered
        SET_ALL_STATIC_DOCLABELS: 'set-all-static-doclabels',
        SHOW_STATUS_CODE_INFO: 'show-status-code-info',
        SPEECH_SEARCH_TRIGGERED: 'speech_search_triggered',
        STATIC_DOCLABEL_DESELECT_ALL: 'static_doclabel_deselect_all',
        TAB_SELECTED: "tab_selected",
        TAB_CLOSED: "tab_closed",
        NEW_TAB_ADDED: "new_tab_added",
        OPEN_NEW_TAB: "open_new_tab",
        OPEN_PURE_TAB: "open_pure_tab",
        OPEN_DUPLICATE_TAB: "open_duplicate_tab",
        HIDE_BOTTOM_TABS: "hide_bottom_tabs",
        SEARCH_FIELD_FOCUS: "search_field_focus",
        SEARCH_FIELD_SET_FOCUS: "search_field_set_focus",
        SEARCH_FIELD_BLUR: "search_field_blur",
        SEARCH_QUERY_CHANGE: "search_query_change",
        SEARCH_QUERY_MOVE_CURSOR: "search_query_move_cursor",
        SEARCH_RESULT_RECEIVED: "search_result_received", // dispatches when a search on a single item is triggered
        SEARCH_SCROLL_TRIGGERED: "search_scroll_triggered", // dispatches when a search is triggered due to endless scroll
        SEARCH_SUBMIT: "search_submit",
        SEARCH_SET_HINT: "search_set_hint",
        SEARCH_SET_NORMALISED_HINT: 'search_set_normalised_hint',
        SEARCH_TRIGGERED: "search_triggered", // dispatches when search
        SEARCH_KEY_DOWN: "search_key_down", // dispatches when search
        SEARCHABLE_FILTER_ADDED: "searchable_facet_added",
        SEARCH_PROFILE_CHANGED: "search_profile_changed",
        SEARCHBAR_RENDERED_INITIALLY: "searchbar_rendered_initially",
        SEARCHMODE_CHANGED: "searchmode_changed",
        RESULTLIST_VIEW_MODE_CHANGE: 'resultlist_view_mode_change',
        SHOW_TOASTER: "show_toaster",
        SORT_RESULT_EVENT_TRIGGERED: "sort_result_event_triggered",
        SOURCE_CHANGED: "source_changed",
        SPEECH_TO_TEXT_MIC_CLICK: "speech_to_text_mic_click",
        SPLIT_DRAG: "split_drag",
        SPLIT_DRAGEND: "split_dragend",
        STATE_CHANGED: "state_changed",
        STATE_LOADED: "state_loaded",
        TIMELINE_INIT: "timeline_init",
        TIMELINE_TOGGLE: "timeline_toggle",
        TIMELINE_UPDATED: "timeline_updated",
        TIMELINE_BREADCRUMB_CLICK: "timeline_breadcrumb_click",
        TOGGLE_FAVORITE: "toggle_favorite",
        TOGGLE_EXPANDED_FACETS_AND_FILTERS: "toggle_expanded_facets_and_filters",
        UI_READY: "ui_ready",
        UPDATE_GEO_DATA: "update_geo_data",
        SEARCHABLE_FOCUS: "searchable_focus",
        UPDATE_COMPONENT_STATE: "update_component_state",
        REMOVE_COMPONENT_STATE: "remove_component_state",
        DESTROY_COMPONENT: "destroy_component",
        WEBSOCKET_MESSAGE: "websocket_message",
        WEBSOCKET_CLOSE: "websocket_close",
        WHILE_YOU_TYPE: "whileyoutype",
        WHILE_YOU_TYPE_RESULT_CANCEL: "wyt_result_hide",
        WHILE_YOU_TYPE_RESULT_CLICK: "wyt_result_click",
        WHILE_YOU_TYPE_RESULT_HIDE: "wyt_result_hide",
        WHILE_YOU_TYPE_RESULT_SHOW: "wyt_result_show",
        WHILE_YOU_TYPE_RESULT_RENDERED: "wyt_result_rendered",
        WHILE_YOU_TYPE_REFRESH: "wyt_result_refresh",
        WINDOW_RESIZE: "window_resize",
        JSON_EXPORT: "json_export"
      },
      ui: {
          bpSmall: '768px',
          bpSmallNumber: 768,
          bpMedium: '1024px',
          bpMediumNumber: 1024,
          appContainerClass: 'ifs-main',
          appInitialClass: 'ifs-initial',
          resultistViewFull: 'full',
          resultistViewCompact: 'compact',
          resultistViewTable: 'table',
          sidebarSizeStandard: [18, 82],
          sidebarSizeExtended: [60, 40]
      },
      tabTypes: {
        DEFAULT: "default",
        SIMILAR: "similar",
        DUPLICATE: "duplicate"
      }
    };
  }

  getConstants () {
    return this.constants;
  }
}
