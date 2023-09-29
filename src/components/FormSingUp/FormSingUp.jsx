import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

const FormSingUp = () => {
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [mail, setMail] = useState("");
	const [promoted, setPromoted] = useState(true);
	const [news, setNews] = useState(true);
	const [errors, setErrors] = useState({
		name: {
			error: false,
			message: "",
		},
		lastName: {
			error: false,
			message: "",
		},
		email: {
			error: false,
			message: "ingrese un correo valido",
		},
	});

	const validateEmail = (email) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	};

	const validateErrors = (name, value, minLength = 3) => {
		const isValid = value.length >= minLength;
		setErrors((prev) => ({
			...prev,
			[name]: {
				error: !isValid,
				message: isValid ? "" : "Ingrese un minimo de 3 caracteres",
			},
		}));

		if (name === "email") {
			const isValidEmail = validateEmail(value);
			setErrors((prev) => ({
				...prev,
				[name]: {
					error: !isValidEmail,
					message: isValidEmail ? "" : "Ingrese un correo valido",
				},
			}));
		}
	};

	const saveData = (e) => {
		e.preventDefault();
		const data = {
			name: name,
			lastName: lastName,
			mail: mail,
			promoted: promoted,
			news: news,
		};

		console.log(data);
	};

	return (
		<Container maxWidth="md" component="section">
			<Box
				component="form"
				sx={{
					"& > :not(style)": { m: 1, width: "100%" },
				}}
				noValidate
				autoComplete="off"
				onSubmit={saveData}
			>
				<Typography variant="h3" align="center" component="h1">
					Formulario de registro
				</Typography>
				<TextField
					id="name"
					label="Nombre"
					variant="standard"
					fullWidth={true}
					margin="normal"
					value={name}
					onChange={(e) => setName(e.target.value)}
					error={errors.name.error}
					helperText={errors.name.error ? errors.name.message : ""}
					onBlur={(e) => {
						validateErrors("name", e.target.value);
					}}
				/>
				<TextField
					id="lastName"
					label="Apellido"
					variant="standard"
					fullWidth={true}
					margin="normal"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					error={errors.lastName.error}
					helperText={
						errors.lastName.error ? errors.lastName.message : ""
					}
					onBlur={(e) => {
						validateErrors("lastName", e.target.value);
					}}
				/>
				<TextField
					id="mail"
					label="Email"
					variant="standard"
					fullWidth={true}
					margin="normal"
					value={mail}
					onChange={(e) => setMail(e.target.value)}
					error={errors.email.error}
					helperText={errors.email.error ? errors.email.message : ""}
					onBlur={(e) => {
						validateErrors("email", e.target.value);
					}}
				/>
				<Container maxWidth="sm" component="div">
					<FormControlLabel
						control={<Checkbox />}
						label="Promociones"
						checked={promoted}
						onChange={(e) => setPromoted(e.target.checked)}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Novedades"
						checked={news}
						onChange={(e) => setNews(e.target.checked)}
					/>
				</Container>
				<Stack spacing={2} direction="row">
					<Button variant="contained" type="submit">
						Registrarse
					</Button>
				</Stack>
			</Box>
		</Container>
	);
};

export default FormSingUp;
