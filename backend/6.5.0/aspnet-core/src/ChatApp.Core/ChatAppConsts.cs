using ChatApp.Debugging;

namespace ChatApp
{
    public class ChatAppConsts
    {
        public const string LocalizationSourceName = "ChatApp";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "8477abd1c709459c8a4378af2ebcbd39";
    }
}
