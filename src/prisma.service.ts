import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        try {
            await this.$connect();
            console.log("Connected to database");
        } catch (error) {
            console.error("Error connecting to database:", error);
            // Handle the error accordingly, like throwing it or terminating the application
        }
    }

    async enableShutDownHooks(app: INestApplication) {
        this.$on('beforeExit' as never, async () => {
            try {
                await app.close();
                console.log("Application shut down gracefully");
            } catch (error) {
                console.error("Error shutting down application:", error);
                // Handle the error accordingly
            }
        });
    }
}
