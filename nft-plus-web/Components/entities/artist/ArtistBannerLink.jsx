import React from 'react'

function BannerLink({ children, href }) {
	return (
		<a href={href} target="_blank">
			{ children }
		</a>
	)
}
export default BannerLink