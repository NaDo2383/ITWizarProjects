const Container = ({ children, fluid }) => {
	return (
		<div
			className={`${
				fluid ? "w-full" : "container"
			} mx-auto sm:px-0 px-[16px] max-w-screen`}>
			{children}
		</div>
	);
};

export default Container;
