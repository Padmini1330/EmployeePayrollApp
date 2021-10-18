const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}   

const checkName=(name)=>{
    let nameRegex=RegExp('[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if(!nameRegex.test(name))
    throw 'Name is incorrect!';
}

const checkStartDate=(startDate)=>{
    let now=new Date();
    if(startDate>now) throw 'Start Date is a future Date!';
    var diff=Math.abs(now.getTime() - startDate.getTime());
    if(diff/(1000*60*60*24)>30)
    throw 'Start Date is beyond 30 days!';
}

function makeServiceCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, request) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log(methodType + " state changed called Ready state: " + xhr.readyState + " Status: " + xhr.status)
            if (xhr.readyState == 4) {
                if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("XHR failed");
                }
                else {
                    resolve(xhr.responseText)
                }
            }
        }
        xhr.open(methodType, url, async);

        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
        else {
            xhr.send();
        }
        console.log(methodType + " Request sent to server ")
    });
}