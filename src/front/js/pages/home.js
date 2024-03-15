import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const guardar = async (e) => {
		e.preventDefault()
		if (email != "" && password != "") {
			let resp = await actions.login(email, password)
			if (resp) {
				if (store.auth) {
					navigate("/demo")
				}
			}
		} else {
			alert("faltan datos")
		}

	}

	const registrar = async (e) => {
		e.preventDefault()
		if (email != "" && password != "") {
			await actions.registrarse(email, password)

		} else {
			alert("faltan datos")
		}
	}

	return (
		<div className="text-center mt-5 container">
			<h1>Hello</h1>
			<form>
				<div className="mb-3">
					<label for="exampleInputEmail1" className="form-label">Email address</label>
					<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
					<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div className="mb-3">
					<label for="exampleInputPassword1" className="form-label">Password</label>
					<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
				</div>
				<button onClick={(e) => guardar(e)} className="btn btn-primary">login</button>
				<button onClick={(e) => registrar(e)} className="btn btn-primary">register</button>
			</form>
		</div>
	);
};
