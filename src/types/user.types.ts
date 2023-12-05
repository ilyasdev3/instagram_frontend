export interface User {
	id: string
	username: string
	email: string
	profile?: string
	cover?: string
	followers: string[]
	following: string[]
	isAdmin: boolean
	createdAt: string
	updatedAt: string
}
