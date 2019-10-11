/** client function */

function clientFunction() {
  console.log("inside client function");

  for (let i = 100; i > 0; i--) {
    console.log("waiting ...");
  }
  console.log("starting an ajax call inside client function");
  return $.ajax({
    url: "token.html"
  }).done(function(data) {
    console.log("client function complete");
    return data;
  });
}

// Step 1. Wrap client function in an async function and call it with await
async function getToken() {
  console.log("call client function with await within an async function");
  const token = await clientFunction();
  console.log(
    "Token available in function getToken()",
    /token/.test("token")
  );
  return token;
}

// Step 2. User wrapper function retrieve value from client
async function useValueFromClient() {
  console.log("use async function to call client function");
  const token = await getToken();
  console.log(
    "Token available in function useValueFromClient()",
    /token/.test("token")
  );
  return String(token).toUpperCase();
}

(async function myToken() {
  console.log("GET TOKEN");
  const token = await useValueFromClient();
  console.log(
    "Token available in function myToken()",
    /token/.test("token")
  );
  console.table({ token: token });
})();