/**
 * @createdBy Phill Anderson 2023/2/22
 */

import useMessageFactory from "common/message/useMessageFactory";
import { getToken } from "utils/storage";
import axios from "./http";
// import useAuthUser from "Components/entities/user/auth/useAuthUser";

function useCrud() {
	const { calcMessage } = useMessageFactory();
	const token = getToken();
	// const { refreshToken } = useAuthUser()
	
	async function getModel(restUrl, isProtected = false) {
		// isProtected && await refreshToken()
		const headers = {
			"Access-Control-Allow-Origin": "*"
		}
		if(isProtected && token){
			headers.Authorization = `Bearer ${token}`
		}
		try {
			const response = await axios({
				method: "get",
				url: restUrl,
				headers
			});
			return response.data;
		} catch (e) {
			const msg = calcMessage(e?.response?.status);
			const val = { success: false, reason: msg };
			return val;	
		}
	}

	async function postModel(restUrl, data, isProtected = false, isLoad = true) {
		// isProtected && await refreshToken()
		const headers = {
			"Access-Control-Allow-Origin": "*",
			'Content-Type':'application/json'
		}
		if(isProtected && token){
			headers.Authorization = `Bearer ${token}`
		}
		try {
			const response = await axios({
				method: "post",
				data: data,
				url: restUrl,
				withCredentials: true,
				headers
			});
			const val = { success: true, data: response.data };
			return val;
		} catch (e) {
			const msg = calcMessage(e?.response?.status);
			const val = { success: false, reason: msg, error: e, message:e?.response?.data?.message};
			return val;
		}
	}

	async function putModel(restUrl, editedModel, isProtected = false) {
		// isProtected && await refreshToken()
		const headers = {
			"Access-Control-Allow-Origin": "*",
		}
		if(isProtected && token){
			headers.Authorization = `Bearer ${token}`
		}
		try {
			const response = await axios({
				method: "put",
				data: editedModel,
				url: restUrl,
				headers
			});
			const val = { success: true, data: response.data };
			return val;
		} catch (e) {
			const msg = calcMessage(e?.response?.status);
			const val = { success: false, reason: msg, error: e };
			return val;
		}
	}

	async function deleteModel(restUrl) {
		// await refreshToken()
		const headers = {
			"Access-Control-Allow-Origin": "*",
		}
		if(token){
			headers.Authorization = `Bearer ${token}`
		}
		const response = await axios({
			method: "delete",
			url: restUrl,
			headers
		});
		return response.data;
	}

	return { getModel, postModel, putModel, deleteModel };
}

export default useCrud;

// for preRendered pages data fetching
export async function getPreRenderModel(restUrl, isProtected = false) {
	try {
		const headers = {
			"Access-Control-Allow-Origin": "*",
		}
		if(isProtected && token){
			headers.Authorization = `Bearer ${token}`
		}
		const response = await axios({
			method: "get",
			url: restUrl,
			headers
		});
		return response.data;
	} catch (e) {
		console.error(e);
	}
}
