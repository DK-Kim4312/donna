import PreferencesIcon from '../../../styles/PreferencesIcon';
import SecurityIcon from '../../../styles/SecurityIcon';
import PasswordIcon from '../../../styles/PasswordIcon';
import SettingsIcon from '../../../styles/SettingsIcon';
export default function OverviewPage() {
    return (
        <div className='flex ml-10 mt-10 mb-10 mr-10'>
            <div className="w-[25vw] h-[90vh] mr-10 relative bg-white shadow border b-1">

            </div>
            <div className="flex flex-col">
                <div className="h-[calc(45vh-20px)] w-[43vw] grid grid-cols-2 gap-10">
                    <div className="w-[20vw] h-[100%] relative bg-white shadow border b-1">
                        <div className="mt-[3vh] ml-[3vw] mb-[3vh] mr-[3vw] self-stretch flex-col justify-start items-center gap-[18px] inline-flex">
                            <div className="text-black text-3xl font-medium font-['Poppins']">Preferences</div>
                            <PreferencesIcon />
                            <div className="w-[179px] text-center text-black text-xs font-medium font-['Poppins']">Fine tune your Personal Assistant to work exactly the way you want!</div>
                            <div className="justify-start items-center gap-2.5 inline-flex">
                                <div className="text-center text-emerald-400 text-base font-medium font-['Poppins'] underline">Update Preferences</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[20vw] h-[100%] relative bg-white shadow border b-1">
                        <div className="mt-[3vh] ml-[3vw] mb-[3vh] mr-[3vw] self-stretch flex-col justify-start items-center gap-[18px] inline-flex">
                            <div className="text-black text-3xl font-medium font-['Poppins']">Security</div>
                            <SecurityIcon />
                            <div className="w-[179px] text-center text-black text-xs font-medium font-['Poppins']">Keep your Verification Methods and Security Methods updated!</div>
                            <div className="justify-start items-center gap-2.5 inline-flex">
                                <div className="text-center text-emerald-400 text-base font-medium font-['Poppins'] underline">Update Security Info</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[calc(45vh-20px)] w-[43vw] mt-10 grid grid-cols-2 gap-10">
                    <div className="w-[20vw] h-[100%] relative bg-white shadow border b-1">
                        <div className="mt-[3vh] ml-[3vw] mb-[3vh] mr-[3vw] self-stretch flex-col justify-start items-center gap-[18px] inline-flex">
                            <div className="text-black text-3xl font-medium font-['Poppins']">Password</div>
                            <PasswordIcon />
                            <div className="w-[179px] text-center text-black text-xs font-medium font-['Poppins']">Make your password stronger, or change it if you want to!</div>
                            <div className="justify-start items-center gap-2.5 inline-flex">
                                <div className="text-center text-emerald-400 text-base font-medium font-['Poppins'] underline">Update Password</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[20vw] h-[100%] relative bg-white shadow border b-1">
                        <div className="mt-[3vh] ml-[3vw] mb-[3vh] mr-[3vw] self-stretch flex-col justify-start items-center gap-[18px] inline-flex">
                            <div className="text-black text-3xl font-medium font-['Poppins']">Settings</div>
                            <SettingsIcon />
                            <div className="w-[179px] text-center text-black text-xs font-medium font-['Poppins']">Change your settings to personalise the feel of your app and see how we manage your data!</div>
                            <div className="justify-start items-center gap-2.5 inline-flex">
                                <div className="text-center text-emerald-400 text-base font-medium font-['Poppins'] underline">Update Settings</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}