import type {Serializable} from "../../serializable/index.ts";
export class Phrase implements Serializable {
	public constructor(value: string) {
		this.value = value;
	}
	public serialize(): string {
		return this.value;
	}
	private readonly value: string;
}
