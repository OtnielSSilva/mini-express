import { MiniExpress } from "./lib/mini-express";

const app = new MiniExpress();

// Logger - Registra o método e a URL da requisição
app.use((req, res, next) => {
	console.log(`Request: ${req.method} ${req.url}`);
	if (next) next();
});

// Verifica a autenticação do usuário
app.use((req, res, next) => {
	const authenticated = true;

	if (authenticated) {
		if (next) next();
	} else {
		res.statusCode = 401;
		res.end("Not authenticated");
	}
});

// Manipula a rota raiz '/'
app.use((req, res, next) => {
	if (req.url === "/") {
		res.write("Welcome to the Home Page!");
		res.end();
	} else {
		if (next) next();
	}
});

// Manipula a rota '/about'
app.use((req, res, next) => {
	if (req.url === "/about") {
		res.write("This is the About Page");
	} else {
		if (next) next();
	}
});

// Manipula todas as outras rotas
app.use((req, res) => {
	res.statusCode = 404;
	res.end("Not Found");
});

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
