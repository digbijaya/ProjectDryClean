export default function LocalServiceWorkerRegister() {
  const swPath = `${process.env.PUBLIC_URL}/myservice-worker.js`;

  if ("serviceWorker" in navigator) {
    console.log("1");
    window.addEventListener("load", function() {
      console.log("2");
      navigator.serviceWorker.register(swPath).then(
        function(registration) {
          console.log("3");
          // Registration was successful
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function(err) {
          // registration failed :(
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }
}
