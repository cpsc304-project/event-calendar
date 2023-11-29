import { Logger as AxiomLogger, LoggerConfig } from "next-axiom";

export class Logger extends AxiomLogger {
	constructor(initConfig?: LoggerConfig) {
		super(initConfig);
	}

	[Symbol.dispose]() {
		void this.flush();
	}
}
