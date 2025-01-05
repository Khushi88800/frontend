const BASE_URL = 'http://localhost:5000';

export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    const url =
        `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const { data } = await result.json();

        return data;
    } catch (err) {
        return err;
    }
}

export const GetEmployeeDetailsById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const { data } = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}

export const DeleteEmployeeById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}


export const CreateEmployee = async (empObj, employee) => {
    const url = `${BASE_URL}/api/employees`;
    console.log('Request URL:', url);

    // Create a FormData object
    const formData = new FormData();

    // Append all fields to the FormData object
    for (const key in empObj) {
        if (Object.prototype.hasOwnProperty.call(empObj, key)) {
            formData.append(key, empObj[key]);
        }
    }

    // Define options for the fetch request
    const options = {
        method: 'POST',
        body: formData, // FormData automatically sets appropriate headers
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    };

    try {
        const response = await fetch(url, options);

        // Check if the response is OK
        if (!response.ok) {
            // Extract error message if possible
            const errorMessage = await response.text();
            throw new Error(
                `Failed to create employee: ${response.status} - ${errorMessage}`
            );
        }

        // Parse JSON response
        const data = await response.json();
        console.log('Response Data:', data);
        return data;
    } catch (err) {
        console.error('Error in CreateEmployee:', err.message);
        return { success: false, message: err.message };
    }
};


// export const CreateEmployee = async (empObj) => {
//     const url = `${BASE_URL}/api/employees`;
//     console.log('url ', url);
//     // Create a FormData object
//     const formData = new FormData();

//     // Append all fields to the FormData object
//     for (const key in empObj) {
//         formData.append(key, empObj[key]);
//     }
//     // FormData handles the headers and content type
//     const options = {
//         method: 'POST',
//         body: formData
//     };
//     try {
//         const result = await fetch(url, options);
//         const data = await result.json();
//         return data;
//     } catch (err) {
//         return err;
//     }
// };

export const UpdateEmployeeById = async (empObj, id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    console.log('url ', url);
    // Create a FormData object
    const formData = new FormData();

    // Append all fields to the FormData object
    for (const key in empObj) {
        formData.append(key, empObj[key]);
    }
    // FormData handles the headers and content type
    const options = {
        method: 'PUT',
        body: formData
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log('<---update--> ', data);
        return data;
    } catch (err) {
        return err;
    }
};
