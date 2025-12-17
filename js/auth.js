async function hash(text) {
const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}


async function register() {
const u = user.value;
const p = pass.value;


const data = await getData();
if (data.users[u]) return alert("User already exists");


data.users[u] = {
password: await hash(p),
balance: 1000
};


await saveData(data);
alert("Registered");
}


async function login() {
const u = user.value;
const p = pass.value;


const data = await getData();
if (!data.users[u]) return alert("User not found");


if (data.users[u].password !== await hash(p))
return alert("Wrong password");


localStorage.setItem("user", u);
window.location = "game.html";
}
