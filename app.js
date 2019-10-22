//Listen for submit
document.getElementById("loan-form").addEventListener("submit",load);

//load function
function load(e){
    //hide results
    document.getElementById("results").style.display = "none";
    //show loading
    document.getElementById("loading").style.display = "block";

    setTimeout(calculateResults, 3000);

    e.preventDefault();
}

//calculate function
function calculateResults(){
    console.log("calculating..");
    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPayment = document.getElementById("monthly-payment");
    const totalInterest = document.getElementById("total-interest");
    const totalPayment = document.getElementById("total-payment");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;


    //calculate monthly
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1); 

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2) ;
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        //show results
        document.getElementById("results").style.display = "block";

        //hide results
        document.getElementById("loading").style.display = "none";
    }
    else{
        showError("Please check your numbers");
        console.log("error");
    }
}

//Show Error

function showError(error){
    //hide results
    document.getElementById("results").style.display = "none";
    
    //hide loading
    document.getElementById("loading").style.display = "none";
    
    //Create div
    const errorDiv = document.createElement("div");
    //get elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");
    //Add class
    errorDiv.className = "alert alert-danger";

    //Add text
    errorDiv.appendChild(document.createTextNode(error));

    //insert error before heading
    card.insertBefore(errorDiv,heading);

    //clear error in 5 seconds
    setTimeout(clearError, 5000);
}

//clear error function
function clearError(){
    document.querySelector(".alert").remove();
}