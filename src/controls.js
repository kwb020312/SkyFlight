export let controls = {};

window.addEventListener("keydown", (e) => {
  controls[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
  controls[e.key.toLowerCase()] = false;
});
