const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false
		},
		actions: {



			login: async (email, password) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/login", {
						method: "POST",
						body: JSON.stringify({
							email: email,
							password: password
						}),
						headers: { "Content-Type": "application/json" }
					})
					const data = await resp.json()
					localStorage.setItem("token", data.access_token)
					setStore({ auth: true })
					// setStore({ message: data.message })
					console.log(data)
					// don't forget to return something, that is how the async resolves
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			registrarse: async (email, password) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/register", {
						method: "POST",
						body: JSON.stringify({
							email: email,
							password: password
						}),
						headers: { "Content-Type": "application/json" }
					})
					const data = await resp.json()
					// setStore({ message: data.message })
					console.log(data)
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			logout:()=>{
				localStorage.removeItem("token")
				setStore({auth:false})
			}

		}
	};
};

export default getState;
