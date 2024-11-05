<template>
    <div class="leaderboard">
      <div class="header">
          <h5>Leaderboard</h5>
          <div class="legend">
            <span class="legend-item">
                <span class="bullet1"></span>All Time Edits</span>
            <span class="legend-item">
                <span class="bullet2"></span>Edits This Week</span>
          </div>
      </div>
      <div class="user-columns">
        <div 
          class="column"
          v-for="(users, index) in [leftColumnUsers, rightColumnUsers]" 
          :key="index">
          <div
            v-for="user in users" :key="user.id"
          >
          <div class="profile-info">
            <img :src="getProfileImg(user)" alt="profileImg" class="profile-img" />
            <div class="user-details">
              <span class="username clickable-label">
                {{ user.name }}
              </span>
              <div class="edit-bars">
                <div class="bar-container">
                  <div class="edit-bar">
                    <div class="edit-progress"
                      :style="{ width: getEditBarWidth(user.allTimeEdits) }"
                    >
                    </div>
                  </div>
                  <span class="edit-count">
                    {{ user.allTimeEdits.toLocaleString() }}
                  </span>
                </div>
                <div class="bar-container">
                  <div class="week-edit-bar">
                    <div class="week-edit-progress"
                      :style="{ width: getWeekEditBarWidth(user.weeklyEdits) }"
                    >
                    </div>
                  </div>
                  <span class="edit-count">
                    {{ user.weeklyEdits.toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
            users: [],
            maxAllTimeEdits: 1200,
            maxWeekEdits: 50,
        };
    },
    created() {
      fetch("/leaderboardData.json")
        .then((response) => response.json())
        .then((data) => {
          this.users = data.users;
        })
        .catch((err) => console.log("Error fetching leaderboard data:", err));
    },
    computed: {
      leftColumnUsers() {
        return this.users.slice(0, Math.ceil(this.users.length / 2));
      },
      rightColumnUsers() {
        return this.users.slice(Math.ceil(this.users.length / 2));
      },
    },
    methods: {
      getProfileImg(user) {
        if (user.profileImage) {
          return new URL(`../assets/${user.profileImage}`, import.meta.url).href;
        } else {
          return this.generatePlaceholderImage(user.name, user.gender);
        }
      },
      generatePlaceholderImage(name, gender) {
        const firstChar = name.charAt(0).toUpperCase();
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const size = 60;

        canvas.width = size;
        canvas.height = size;

        if (gender === "female") {
          context.fillStyle = "pink";
        } else if (gender === "male") {
          context.fillStyle = "lightblue";
        } else {
          context.fillStyle = "lightgray";
        }

        context.fillRect(0, 0, size, size);

        context.fillStyle = "#fff";
        context.font = "35px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(firstChar, size / 2, size / 2);

        return canvas.toDataURL("image/png");
      },
      getEditBarWidth(allTimeEdits) {
        const percentage = (allTimeEdits / this.maxAllTimeEdits) * 100;
        return percentage > 100 ? "100%" : `${percentage}%`;
      },
      getWeekEditBarWidth(weeklyEdits) {
        const percentage = (weeklyEdits / this.maxWeekEdits) * 100;
        return percentage > 100 ? "100%" : `${percentage}%`;
      }
    }
  
  }
  </script>
  
  <style scoped>
  .leaderboard {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0 auto;
  }

  .header {
    display: flex;
    align-items: center;
  }

  .header h5 {
    padding-left: 2%;
    padding-right: 20px;
    font-weight: bold;
  }

  .legend {
    display: block;
    gap: 20px;
  }

  .legend-item {
    display: flex;
    unicode-bidi: isolate;
    align-items: center;
    font-size: 14px;
  }

  .bullet1, .bullet2 {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .bullet1 {
    background: linear-gradient(45deg, #90cea1, #01b4e4);
}

  .bullet2 {
    background: linear-gradient(45deg, #f8ae6c, #dd5064);
  }

  .user-columns{
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    margin-left: 2%;
    margin-right: 2%;
  }

  .column {
    flex: 1;
  }

  .profile-info {
    display: flex;
    align-items: center;
  }

  .profile-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    cursor: pointer;
  }

  .user-details {
    flex-grow: 1;
  }

  .username {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    display: block
  }

  .clickable-label {
    cursor: pointer;
    color: black;
  }

  .clickable-label:hover {
    color: #04b4e4;
  }

  .edit-bars {
    width: 100%;
  }

  .bar-container {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .edit-bar,
  .week-edit-bar {
    flex-grow: 1;
    height: 8px;
    border-radius: 4px;
    position: relative;
    margin-right: 10px;
  }

  .edit-progress,
  .week-edit-progress { 
    height: 100%;
    border-radius: 4px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .edit-progress {
    background: linear-gradient(45deg, #90cea1, #01b4e4);
  }

  .week-edit-progress {
    background: linear-gradient(45deg, #f8ae6c, #dd5064);
  }

  .edit-count {
    font-weight: bold;
    font-size: 14px;
    white-space: nowrap;
  }
  </style>