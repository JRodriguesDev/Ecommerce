import { verifySession } from "@/services/DAL/user"
import { getProfileDTO } from "@/services/DTO/user"

const Profile = async () => {
    const session = await verifySession()
    const profile = await getProfileDTO()
    

    return (
        <div>
            <h1>/Profile</h1>
            <p>{session.isAuth}</p>
            <p>{session.userId}</p>
            <p>{profile?.username}</p>
        </div>
    )
}

export default Profile