import type {Serializable} from "../../serializable/index.ts";
import type {IdLeft} from "./id-left/index.ts";
import type {IdRight} from "./id-right/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.4
 */
export class MsgId implements Serializable {
	public constructor(idLeft: IdLeft, idRight: IdRight) {
		this.idLeft = idLeft;
		this.idRight = idRight;
	}
	public equals(otherMsgId: MsgId): boolean {
		return (
			this.idLeft === otherMsgId.idLeft && this.idRight === otherMsgId.idRight
		);
	}
	public idLeft: IdLeft;
	public idRight: IdRight;
	public serialize(): `<${IdLeft}@${IdRight}>` {
		const serializedThis: `<${IdLeft}@${IdRight}>` = `<${this.idLeft}@${this.idRight}>`;
		return serializedThis;
	}
}
