export const filterMenuVariants  = {
    initial : {
        width: '100%',
        display:'flex',
        gap: '16px',
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
    },
    animate:{
        backgroundColor: "red",
        transition:{
            duration: 2
        }
    },
    hidden: {
        display: 'flex',
        transition:{
            type: 'spring',
            stiffness: 50,
        }
    }
};