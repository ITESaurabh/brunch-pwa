export let globalLog = "fetching logs....</br>";
export let ws = new WebSocket("ws://localhost:8080");
export default function ws_connect(dispatch) {

    ws.onopen = function (e) {
      ws.send("brunch-version\nlatest-stable\nlatest-unstable\nlatest-chromeos\nchromeos-version");
      dispatch({type: 'SET_UNSUPPORTED',payload: false})
    };

    ws.onclose = function (evt) {
      console.log("Connection closed");
    };
    ws.onerror = function (error) {
      dispatch({type: 'SET_UNSUPPORTED',payload: true})
    };
    ws.onmessage = async function (evt) {
      var messages = evt.data.split(':next:');
      for (var i = 0; i < messages.length; i++) {
        console.log("Message received: " + messages[i]);
        if (messages[0] === "brunch-version") {
          dispatch({ type: 'SET_MY_BRUNCH', payload: messages[1] });
          break;
        }
        if (messages[0] === "latest-stable") {
          // if (notifications.value === "yes" && brunch_stable.value === "yes") {
          //   if (latest_stable && latest_stable.value !== "" && messages[1] !== "" && latest_stable.value !== messages[1]) {
          //     showNotification("New brunch stable release available: " + messages[1], "brunch");
          //   }
          // }
          dispatch({ type: 'SET_BRUNCH_ST', payload: messages[1] });
          break;
        }
        if (messages[0] === "latest-unstable") {
          // if (notifications.value === "yes" && brunch_unstable.value === "yes") {
          //   if (latest_unstable && latest_unstable.value !== "" && messages[1] !== "" && latest_unstable.value !== messages[1]) {
          //     showNotification("New brunch unstable release available: " + messages[1], "brunch");
          //   }
          // }
          dispatch({ type: 'SET_BRUNCH_US', payload: messages[1] });
          break;
        }
        if (messages[0] === "chromeos-version") {
          dispatch({ type: 'SET_MY_CHROS', payload: messages[1] });
          break;
        }
        if (messages[0] === "latest-chromeos") {
          // if (notifications.value === "yes" && chromeos.value === "yes") {
          //   if (latest_chromeos && latest_chromeos.value !== "" && messages[1] !== "" && latest_chromeos.value !== messages[1]) {

          //     showNotification("New recovery image available: " + messages[1], "chromeos");
          //   }
          // }
          dispatch({ type: 'SET_CHROS_LATEST', payload: messages[1] });
          break;
        }
        globalLog += messages[i] + '<br/>';
      }
    }
}