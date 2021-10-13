class EmployeePayrollData 
{
    get id() 
    {
        return this._id;
    }
    set id(id) 
    {
        this._id = id;
    }

    get profilePicture() 
    {
        return this._profilePicture;
    }
    set profilePicture(profilePicture) 
    {
        this._profilePicture = profilePicture;
    }

    get name() 
    {
        return this._name;
    }
    set name(name) 
    {
        const NAME_REGEX = RegExp("^[A-Z]{1}[a-zA-Z]{2,}?$");
        if (NAME_REGEX.test(name)) {
            this._name = name;
        } else throw "Name is Incorrect!";
    }
    get salary() 
    {
        return this._salary;
    }
    set salary(salary) 
    {
        this._salary = salary;
    }

    get gender() 
    {
        return this._gender;
    }
    set gender(gender) 
    {
        this._gender = gender;
    }

    get startDate() 
    {
       return this._startDate;
    }
    set startDate(startDate) 
    {
        let today=new Date();
        let oneMonth=30*24*60*60*1000;
        if(startDate <= new Date() && (Date.now()-startDate)<oneMonth) {
            this._startDate = startDate;
        } 
        else throw "Start Date is Incorrect!";
    }

    get departments() 
    {
        return this._departments;
    }
    set departments(departments) 
    {
        if (departments.length != 0) 
        {
            this._departments = departments;
        } 
        else throw "No Department Entered!";
    }

   

    toString() {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const employeeDate = !this.startDate ? "undefined" :
            this.startDate.toLocaleDateString("en-US", options);
        return "[ id: " + this.id + ", name: " + this.name + ", gender: " + this.gender + ", profilePicture: " + this.profilePicture +
            ", salary: " + this.salary + ", startDate: " + employeeDate + ", departments: " + this.departments + ", note: " + this._note + " ]" + "\n";
    }
}