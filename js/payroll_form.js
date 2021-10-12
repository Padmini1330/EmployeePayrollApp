function save() 
{
    let employeePayrollData = new EmployeePayrollData();
    try 
    {
        employeePayrollData.name = document.querySelector("#name").value;
    } 
    catch (error) 
    {
        alert(error);
        return;
    }
    employeePayrollData.gender = document.querySelector("#male").checked ? "M" : "F";
    employeePayrollData.salary = document.querySelector("#salary").value;
    dateString = document.querySelector("#month").value + " " + 
                document.querySelector("#day").value + ", " + 
                document.querySelector("#year").value;
    try 
    {
        employeePayrollData.startDate = new Date(dateString);
    } 
    catch (error) 
    {
        alert(error);
        return;
    }
    let departmentsArray = [];
    document.querySelectorAll("[name=department]").forEach(input => {
        if (input.checked) departmentsArray.push(input.value);
    });
    try 
    {
        employeePayrollData.departments = departmentsArray;
    } 
    catch (error) 
    {
        alert(error);
        return;
    }
    alert("Employee Added Successfully!\n" + employeePayrollData.toString());
}
var a=new Date();
console.log(a);
const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
salary.oninput = function() {
    output.textContent = salary.value;
};

const text = document.querySelector('#name')
const textError = document.querySelector('.text-error')
text.addEventListener('input', function() {
    let nameRegEx = RegExp('^[A-Z]{1}[a-zA-z]{2,}$')
    if(nameRegEx.test(text.value))
        textError.textContent = ""
    else
        textError.textContent = "Incorrect Name"
});