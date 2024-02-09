/**
 * @createdBy Phill Anderson 2023/04/05
 */
import useCrud from "common/axios/crud";
import { useGlobalContext } from "common/global/useGlobalContext";
import useMessageFactory from "common/message/useMessageFactory";
import { apis } from "utils/libs";
import { useDeactiveContext } from "./deactiveContext";

function useResignMembership() {
	const { setGlobalLoading } = useGlobalContext();
	const { deleteModel } = useCrud();
	const { calcMessage } = useMessageFactory();
	const {} = useDeactiveContext();

	async function deactivateUser() {
		setGlobalLoading(true);
		try {
			const res = await deleteModel(apis.userDeactivate, true);
			return res;
		} catch (e) {
			if (e?.response) {
				return calcMessage(e?.response?.status);
			}
			throw new Error(e);
		} finally {
			setGlobalLoading(false);
		}
	}

	return {
		deactivateUser
	};
}

export default useResignMembership;
