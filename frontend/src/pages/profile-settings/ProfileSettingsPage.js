import ProfileSettingsSection from '../../components/elements/ProfileSettingsSection'
import ProfileSettingsForm from '../../components/elements/ProfileSettingsForm'
import useProfileDetails from '../../hooks/useProfileDetails'
import { useParams } from 'react-router-dom'
import NavBarLanding from '../../components/elements/NavBarLanding'
import Footer from '../../components/Footer'

export default function ProfileSettingsPage() {
  const { id } = useParams()
  const { isLoading, userData, userPicData } = useProfileDetails(id)
  return (
    <>
      <NavBarLanding />
      <ProfileSettingsSection>
        {!isLoading && (
          <ProfileSettingsForm userData={userData} userPicData={userPicData} />
        )}
      </ProfileSettingsSection>

      <Footer />
    </>
  )
}
