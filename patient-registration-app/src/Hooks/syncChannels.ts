// src/utils/broadcast.ts
const channel = new BroadcastChannel("patient-sync");

export const broadcastChange = () => {
  channel.postMessage({ type: "PATIENT_UPDATED" });
};

export const onBroadcast = (callback: () => void) => {
    channel.onmessage = (event) => {
        console.log("Broadcast received:", event.data); // <== for debug
    if (event.data.type === "PATIENT_UPDATED") {
      callback();
    }
  };
};
