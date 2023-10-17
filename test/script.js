function showDetails(planNumber) {
    var modal = document.getElementById("detailsModal");
    var modalTitle = document.getElementById("modalTitle");
    var modalContent = document.getElementById("modalContent");
  
    var planData = getPlanData(planNumber);
  
    modalTitle.innerText = planData.name;
    modalContent.innerHTML = `
          <h3>Plan Details</h3>
          <p><strong>Description:</strong> ${planData.description}</p>
          <p><strong>Duration:</strong> ${planData.duration}</p>
          <p><strong>Benefits:</strong> ${planData.benefits}</p>
      `;
  
    modal.style.display = "block";
  }
  
  function closeModal() {
    var modal = document.getElementById("detailsModal");
    modal.style.display = "none";
  }
  
  function getPlanData(planNumber) {
    const planData = {
      1: {
        name: "Weight Loss Plan",
        description: "Get in shape with our 4-week weight loss plan. Balanced nutrition and effective workouts...",
        duration: "4 weeks",
        benefits: "Improved fitness, weight loss, increased energy"
      },
      2: {
        name: "Muscle Gain Plan",
        description: "Build muscle and increase strength with our muscle gain program. Customized meal plans...",
        duration: "6 weeks",
        benefits: "Muscle growth, improved strength, enhanced physique"
      }
      // Add more plan data as needed
    };
  
    return planData[planNumber];
  }
  