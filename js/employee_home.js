let employeePayrollList;

window.addEventListener('DOMContentLoaded', (event) => {
    if (site_properties.use_local_storage.match("true")) 
    {
      getEmployeePayrollDataFromStorage();
    }
    else 
    {
      console.log("method call to server");
      getEmployeePayrollDataFromServer();
    }
  
  });
  
  const processEmployeePayrollDataResponse = () => {
    console.log("inside process");
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('edit');
  };
  
  const getEmployeePayrollDataFromStorage = () => {
    employeePayrollList = localStorage.getItem('EmployeePayrollList') ? 
    JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
  };
  
  const getEmployeePayrollDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
      .then(responseText => {
        employeePayrollList = JSON.parse(responseText);
        processEmployeePayrollDataResponse();
      })
      .catch(error => {
        console.log("GET Error Status ******: " + JSON.stringify(error));
        employeePayrollList = [];
        processEmployeePayrollDataResponse();
      })
  };

  
const createInnerHtml = () => {
    const headerHtml =`<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>`;
    let innerHtml = `${headerHtml}`;
    if (employeePayrollList.length == 0) 
    {
        return;
    }
    for (let employeePayrollData of employeePayrollList) 
    {
        innerHtml = `${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${employeePayrollData._profilePicture}"></td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td>${getDepartmentHtml(employeePayrollData._departments)}</td>
            <td>${employeePayrollData._salary}</td>
            <td>${stringifyDate(employeePayrollData._startDate)}</td>
            <td>
                <img id="${employeePayrollData.id}" onclick="remove(this)" alt="delete" src="..//assets/icons/delete-black-18dp.svg">
                <img id="${employeePayrollData.id}" onclick="update(this)" alt="edit" src="..//assets/icons/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector("#display").innerHTML = innerHtml;
};

const getDepartmentHtml = (departmentList) => {
    let departmentHtml = "";
    if (departmentList) 
    {
        for (let department of departmentList) 
        {
            departmentHtml = `${departmentHtml} <div class="dept-label">${department}</div>`;
        }
    }
    return departmentHtml;
};

const remove = (node) => {
    let employeePayrollData = employeePayrollList.find(employeeData => employeeData.id == node.id);
    if (!employeePayrollData) return;
    const index = employeePayrollList.map(employeeData => employeeData.id).indexOf(employeePayrollData.id);
    employeePayrollList.splice(index, 1);
    if(site_properties.use_local_storage.match("true"))
    {
        localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
        createInnerHtml();
    }
    else
    {
        const deleteUrl = site_properties.server_url+ employeePayrollData.id.toString();
        makeServiceCall("DELETE",deleteUrl, false)
            .then(responseText => {
                createInnerHtml();
            })
            .catch(error => {
                console.log("DELETE Error Status: "+ JSON.stringify(error));
            })
    }
};


const update = (node) => {
    let employeePayrollData = employeePayrollList.find(employeeData => employeeData.id == node.id);
    if (!employeePayrollData) return;
    localStorage.setItem("EmployeeToEdit", JSON.stringify(employeePayrollData));
    window.location.replace(site_properties.add_emp_payroll_page);
};