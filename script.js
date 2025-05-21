document.addEventListener("DOMContentLoaded", () => {
  const displayBtn = document.getElementById("displayBtn")
  const clubInfoContainer = document.getElementById("clubInfo")
  const clubHeading = document.getElementById("club-heading")

  displayBtn.addEventListener("click", () => {
    // Fetch the club.json file
    fetch("club.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        // Update the heading with the club name
        clubHeading.textContent = `Welcome to ${data.clubName}`

        // Create HTML content for club info
        let html = `
                    <div class="info-item">
                        <h2>${data.clubName}</h2>
                        <p><strong>Established:</strong> ${data.established}</p>
                        <p><strong>President:</strong> ${data.president}</p>
                        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                        <p class="meeting-time"><strong>Weekly Meeting:</strong> ${data.weeklyMeeting}</p>
                    </div>
                    
                    <div class="info-item">
                        <h3>Upcoming Events</h3>
                        <ul class="events-list">
                `

        // Add each event to the HTML
        data.events.forEach((event) => {
          html += `<li><strong>${event.name}</strong> - ${event.date}</li>`
        })

        html += `
                        </ul>
                    </div>
                `

        // Display the club info
        clubInfoContainer.innerHTML = html
        clubInfoContainer.classList.add("active")
      })
      .catch((error) => {
        console.error("Error fetching club data:", error)
        clubInfoContainer.innerHTML = "<p>Error loading club information. Please try again.</p>"
        clubInfoContainer.classList.add("active")
      })
  })
})
