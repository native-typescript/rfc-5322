import type {Serializable} from "../../serializable/index.ts";
export class HeaderOfMessage implements Serializable {
	public constructor(name: string, value: string) {
		this.name = name;
		this.value = value;
	}
	public readonly name: string;
	public serialize(): `${string}: ${string}` {
		const serializedThis: `${string}: ${string}` =
			`${this.name}: ${this.value}` as const satisfies string;
		return serializedThis;
	}
	public readonly value: string;
}
