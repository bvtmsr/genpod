import { Container } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
	const navigate = useNavigate()

	useEffect(() => {
		const id = notifications.show({
			title: 'ERROR:404 Page Not Found',
			message:
				'You have reached to a Dead End, Navigating back to Home Page in 5 seconds...',
			color: 'red',
			autoClose: 5000,
			onClose: () => {
				navigate('/')
			},
		})

		return () => {
			notifications.hide(id)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<Container size='xl'>
			<h1>404</h1>
			<p>Page Not Found</p>
		</Container>
	)
}
