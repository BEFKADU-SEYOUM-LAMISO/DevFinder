// var user = document.getElementById("userInput");
// var searchBtn = document.getElementById("search");
// var avatar = document.getElementById("avatar");
// var userName = document.getElementById("userName");
// var bio = document.getElementById("bio");
// var userLocation = document.getElementById("location");
// var followers = document.getElementById("followers");
// var profile = document.getElementById("profile");

// searchBtn.addEventListener("click", function(event) {
//     event.preventDefault();

//     document.getElementById("loading").classList.remove("hidden");

//     profile.classList.add("hidden");
//     avatar.src = "";
//     userName.textContent = "";
//     bio.textContent = "";
//     userLocation.textContent = "";
//     followers.textContent = "";

//     var usernameInput = user.value.trim(); // ✅ NEW VARIABLE

//     if (!usernameInput) {
//         alert("Please enter a user name");
//         return;
//     }

//     fetch(`https://api.github.com/users/${usernameInput}`)
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById("loading").classList.add("hidden");

//             if (data.message === "Not Found") {
//                 alert("User not found");
//                 return;
//             }

//             avatar.src = data.avatar_url;
//             userName.textContent = data.login;
//             bio.textContent = data.bio || "No bio available";
//             UserLocation.textContent = data.location || "No location provided";
//             followers.textContent = data.followers;

//             profile.classList.remove("hidden");
//         })
//         .catch(error => {
//             document.getElementById("loading").classList.add("hidden");
//             console.error("Error fetching data:", error);
//             alert("An error occurred while fetching data.");
//         });
// });
// mine was this and get updated with the next one


const userInput = document.getElementById("userInput");
const searchBtn = document.getElementById("search");
const avatar = document.getElementById("avatar");
const userName = document.getElementById("userName");
const bio = document.getElementById("bio");
const userLocation = document.getElementById("location");
const followers = document.getElementById("followers");
const profile = document.getElementById("profile");
const loading = document.getElementById("loading");

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  
  // Reset UI
  loading.classList.remove("hidden");
  profile.classList.add("hidden");
  avatar.src = "";
  userName.textContent = "";
  bio.textContent = "";
  userLocation.textContent = "";
  followers.textContent = "";

  const username = userInput.value.trim();
  if (!username) {
    loading.classList.add("hidden");
    alert("Please enter a GitHub username");
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    // Handle HTTP errors (404, 403, etc.)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      } else if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Try again later.");
      } else {
        throw new Error(`GitHub API error: ${response.status}`);
      }
    }

    const data = await response.json();

    // Update profile
    avatar.src = data.avatar_url;
    userName.textContent = data.login || "No username";
    bio.textContent = data.bio || "No bio available";
    userLocation.textContent = data.location || "No location specified";
    followers.textContent = data.followers;

    // Show results
    profile.classList.remove("hidden");
  } catch (error) {
    console.error("Fetch error:", error);
    alert(error.message); // Show specific error message
  } finally {
    loading.classList.add("hidden");
  }
});