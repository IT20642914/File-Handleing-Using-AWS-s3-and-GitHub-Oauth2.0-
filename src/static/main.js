const URL_PARAMS = new URLSearchParams(window.location.search);
      const TOKEN = URL_PARAMS.get('token');

      // Show an element
      const show = (selector) => {
        document.querySelector(selector).style.display = 'block';
      };

      // Hide an element
      const hide = (selector) => {
        document.querySelector(selector).style.display = 'none';
      };

      if (TOKEN) {
        hide('.content.unauthorized');
        show('.content.authorized');
      }

      document.addEventListener("DOMContentLoaded", function () {
        // Handle the click event of the "Select File" button
        const fileInputButton = document.getElementById("fileInputButton");
        const fileInput = document.getElementById("formData");
        const alertMessage = document.getElementById("alertMessage");

        fileInputButton.addEventListener("click", function () {
          fileInput.click(); // Trigger a click event on the hidden file input

          // Hide the alert message when a new file is selected
          alertMessage.style.display = "none";
        });
        fileInput.addEventListener("change", function () {
          const selectedFileName = document.getElementById("selectedFileName");
          selectedFileName.textContent = fileInput.files[0].name;
        });
      });

      document.addEventListener("DOMContentLoaded", function () {
        // Check the user's authorization status and decide whether to show the form.
        const isAuthorized = true; // Set this to your actual authorization status.

        const unauthorizedContent = document.querySelector(".unauthorized");
        const authorizedContent = document.querySelector(".authorized");
        const dataForm = document.getElementById("dataForm");
      
        const fileNameInput = document.getElementById("fileName");
        if (isAuthorized) {
          unauthorizedContent.style.display = "none";
          authorizedContent.style.display = "block";
        }

        // Handle form submission
        dataForm.addEventListener("submit", function (e) {
          e.preventDefault();

          const formDataInput = document.getElementById("formData");
          const file = formDataInput.files[0]; // Get the selected file from the input
          const fileName = fileNameInput.value
          // Create a FormData object and append the file to it
          const formData = new FormData();
          formData.append("file", file); // Append the file to the FormData object with the name "file"

          // Use Axios to send the form data to your server
          axios({
            method: "post",
            url: "http://localhost:9090/aws/UploadFile",
            data: formData, // Send the FormData object with the file data
          })
            .then(function (response) {
              // Handle the response from the server
              console.log("Data sent successfully");

              // Display a success alert message
              const alertMessage = document.getElementById("alertMessage");
              alertMessage.textContent = "File submitted successfully!";
              alertMessage.style.color = "green";
              alertMessage.style.display = "block";
            })
            .catch(function (error) {
              // Handle errors
              console.error("Error sending data:", error);
              const alertMessage = document.getElementById("alertMessage");
              alertMessage.textContent = "File submitted Usuccessfully!";
              alertMessage.style.color = "red";
              alertMessage.style.display = "block";
            })
          
        });
        const downloadForm = document.getElementById("download");
        // Handle file download
   downloadForm.addEventListener("submit", function (e) {
     e.preventDefault(); // Prevent the default form submission
 
     const fileName = fileNameInput.value;
 
     if (!fileName) {
       alert("Please enter a file name.");
       return;
     }
 
     axios
       .get(`http://localhost:9090/aws/downloadFile?fileName=${fileName}`, { responseType: "blob" })
       .then(function (response) {
         if (response.status === 200) {
           const blob = new Blob([response.data]);
           const a = document.createElement("a");
           a.href = window.URL.createObjectURL(blob);
           a.download = fileName;
           a.click();
           window.URL.revokeObjectURL(a.href);
           alertMessage.textContent = "File downloaded successfully!";
           alertMessage.style.color = "green";
           alertMessage.style.display = "block";
         } else {
           alertMessage.textContent = "File download failed.";
           alertMessage.style.color = "red";
           alertMessage.style.display = "block";
         }
       })
       .catch(function (error) {
         alertMessage.textContent = "Network error: " + error.message;
         alertMessage.style.color = "red";
         alertMessage.style.display = "block";
       });
   });
 
      });
     