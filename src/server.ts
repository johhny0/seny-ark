import "reflect-metadata"
import { EnvConfig } from "./envConfig";
import { ExpressService } from "./api/expressService";
import { Dino } from "./entities/dino.entity";
import AppDataSource from "./data-source";

//https://cloudnweb.dev/2019/09/building-a-production-ready-node-js-app-with-typescript-and-docker/
//https://www.npmjs.com/package/http-proxy-middleware

//TODO: ADD TESTS
//TODO: ADD SWAGGER
//TODO: ADD JWT
//TODO: ADD ORM

async function main() {
    const config = new EnvConfig();
    config.load();

    const expressService = new ExpressService()
    const app = expressService.config(config);

    try {
        await AppDataSource.initialize();
        console.log('Conectado ao banco de dados');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }

    app.get("/", (_, res) => res.json({ msg: "Ark API Runnin! 🐱‍🐉" }));

    app.get("/dinos", async (_, res) => {
        const dinoRepository = AppDataSource.getRepository(Dino);

        const dinos = await dinoRepository.find({
            order: {
                catch: 'ASC',
                name: 'ASC'
            }
        });

        res.json(dinos);
    });

    app.post("/dinos", async (req, res) => {
        const dinoRepository = AppDataSource.getRepository(Dino);

        const { name, link, img, entityId } = req.body;

        const dinoExists = await dinoRepository.exists({ where: { name } });

        if (dinoExists) {
            return res.status(400).json({ msg: "🐱‍🐉🚫 Dino already saved" })
        }

        const dino = new Dino(name, link, img, entityId);

        await dinoRepository.save(dino);

        res.json({ ...dino, msg: "🐱‍🐉🟢 Dino saved" });
    })

    app.patch("/dinos/:id/catch", async (req, res) => {
        const dinoRepository = AppDataSource.getRepository(Dino);

        const { id } = req.params;

        const dino = await dinoRepository.findOneBy({ id });

        if (dino == null) {
            return res.status(404).json({ msg: "🐱‍🐉 Not found" });
        }

        dino.catch = !dino.catch

        dinoRepository.save(dino);
        res.json(dino);
    });

    app.all("*", (_, res) => res.status(404).json({ msg: "Ark: Route Does Not Exists! 🛑🤚" }))

    app.listen(config.port, () => console.log(`🔥 ${config.applicationName}. Server running at: ${config.host}:${config.port}`));
}

main();
