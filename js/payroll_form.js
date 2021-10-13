window.addEventListener("DOMContentLoaded", () => {

    const name = document.querySelector("#name");
    const nameError = document.querySelector(".text-error");
    name.addEventListener("input", function() {
        if (name.value.length == 0) {
            nameError.textContent = "";
            return;
        } 
        try 
        {
            (new EmployeePayrollData).name = name.value;
            nameError.textContent = "";
        } 
        catch (error) 
        {
            nameError.textContent = error;
        }
    });

    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent=salary.value;
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
    });
});


const save = () => {
    try 
    {
        let employeePayrollData = createEmployeePayrollObject();
        updateLocalStorage(employeePayrollData);
    } 
    catch (submitError) 
    {
        alert(submitError);
        return;
    }
};

const createEmployeePayrollObject = () => {
    let employeePayrollData = new EmployeePayrollData();
    try
    {
        employeePayrollData.name = getValue("#name");
    }
    catch(error)
    {
        throw error;
    }
    
    employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
    employeePayrollData.profilePicture = getSelectedValues("[name=profile]").pop();
    employeePayrollData.salary = getValue("#salary");
    dateString = document.querySelector("#month").value + " " + document.querySelector("#day").value + ", " + document.querySelector("#year").value;
    employeePayrollData.startDate = new Date(dateString);
    employeePayrollData.note = getValue("#notes");
    try {
        employeePayrollData.departments = getSelectedValues("[name=department]");
    } catch (error) {
        alert(error);
        return;
    }
    alert("Employee Added Successfully!\n" + employeePayrollData.toString());
    return employeePayrollData;
};


function updateLocalStorage(employeePayrollData) 
{
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList")); //storage object
    if (employeePayrollList != undefined) 
    {
        employeePayrollList.push(employeePayrollData);
    } 
    else 
    {
        employeePayrollList = [employeePayrollData];
    }
    alert("Local Storage Updated Successfully!\nTotal Employees : " + employeePayrollList.length);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}


const getSelectedValues = (propertyName) => {
    let allValues = document.querySelectorAll(propertyName);
    let selectedValues = [];
    allValues.forEach(input => {
        if (input.checked) selectedValues.push(input.value);
    });
    return selectedValues;
};

const getValue = (propertyId) => {
    let value = document.querySelector(propertyId).value;
    return value;
};

const resetForm = () => {
    setValue("#name", "");
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    setValue("#day", "1");
    setValue("#month", "January");
    setValue("#year", "2020");
    setValue("#notes", "");
    resetRange("#salary", ".salary-output");
};

const setValue = (propertyId, value) => {
    const element = document.querySelector(propertyId);
    element.value = value;
};

const unsetSelectedValues = (propertyName) => 
{
    let allValues = document.querySelectorAll(propertyName);
    allValues.forEach(input => input.checked == false);
};

const setTextValue = (propertyId, value) => {
    const element = document.querySelector(propertyId);
    element.textContent = value;
};

const resetSalaryRange = (propertyId, outputId) => {
    const rangeElement = document.querySelector(propertyId);
    rangeElement.value = 400000;
    const outputElement = document.querySelector(outputId);
    outputElement.textContent = rangeElement.value;
};