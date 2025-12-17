const user = localStorage.getItem("user");
if (!user) location = "index.html";


let data, balance;


(async () => {
data = await getData();
balance = data.users[user].balance;
document.getElementById("user").innerText = user;
document.getElementById("balance").innerText = balance;
})();


async function play() {
const bet = Number(document.getElementById("bet").value);
if (bet <= 0 || bet > balance) return alert("Invalid bet");


const win = Math.random() < 0.5;
balance += win ? bet : -bet;


data.users[user].balance = balance;
await saveData(data);


document.getElementById("balance").innerText = balance;
document.getElementById("result").innerText = win ? "WIN" : "LOSE";
}


function logout() {
localStorage.removeItem("user");
location = "index.html";
}
