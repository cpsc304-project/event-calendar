import { Logger as AxiomLogger, LoggerConfig } from "next-axiom";

export class Logger extends AxiomLogger {
	constructor(initConfig?: LoggerConfig) {
		super(initConfig);
	}

	async [Symbol.asyncDispose]() {
		await this.flush();
	}
}
