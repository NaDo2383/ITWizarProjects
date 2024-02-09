/**
 * @createdBy Phill Anderson 2022/12/16
 */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function BackDrop({ children }) {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				className="fixed top-0
				 left-0 right-0 bottom-0 w-screen h-screen z-[120] flex justify-center items-center bg-black bg-opacity-60">
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

export default BackDrop;
