const isChrome = typeof browser == "undefined"              // Whether it's Chrome. Chrome uses the chrome object, while Firefox and Edge use the browser object.


function loadNXsettings()
{
    return new Promise(resolve =>
    {
        readSetting("NXsettings", function(obj)
        {
            if (!obj.NXsettings)        // If it's running for the first time, store the following default settings.
            {
                NXsettings =
                {
                    SecurityPage: { CollapseList: true },
                    PrivacyPage:
                    {
                        CollapseList: true,
                        SortAZ: false
                    },
                    AllowDenylistPage:
                    {
                        SortAZ: false,
                        SortTLD: false,
                        Bold: false,
                        Lighten: false,
                        RightAligned: false,
                        MultilineTextBox: false,
                        DomainsDescriptions: {}     // In Chrome it's required to be an object to use named items. In Firefox it works even with an array, but with some bugs.
                    },
                    LogsPage:
                    {
                        ShowCounters: false,
                        DomainsToHide: ["nextdns.io", ".in-addr.arpa", ".ip6.arpa"]
                    }
                }

                saveSettings(NXsettings)
            }
            else
            {
                NXsettings = obj.NXsettings

                // Migrate old array-based domain descriptions to an object, to prevent crashes on profiles that stored them as an array.
                if (NXsettings.AllowDenylistPage && Array.isArray(NXsettings.AllowDenylistPage.DomainsDescriptions))
                {
                    const migratedDescriptions = {}

                    NXsettings.AllowDenylistPage.DomainsDescriptions.forEach(function(description, index)
                    {
                        if (description)  migratedDescriptions[index] = description
                    })

                    NXsettings.AllowDenylistPage.DomainsDescriptions = migratedDescriptions

                    saveSettings()
                }

                // Remove empty entries from the domains to hide, as an empty string matches every single domain, hiding all the log entries.
                if (NXsettings.LogsPage && Array.isArray(NXsettings.LogsPage.DomainsToHide))
                    NXsettings.LogsPage.DomainsToHide = NXsettings.LogsPage.DomainsToHide.filter(d => d.trim() != "")
            }

            resolve()
        })
    })
}

// Queue the writes so that quick successive changes don't overwrite each other with a stale snapshot of the settings.
let saveQueue = Promise.resolve()

function saveSettings(object)
{
    if (!object)  object = NXsettings

    saveQueue = saveQueue.then(function()
    {
        if (isChrome)
            return chrome.storage.local.set({NXsettings: object})
        else
            return browser.storage.local.set({NXsettings: object})
    })

    return saveQueue
}

function readSetting(settingName, callback)
{
    if (isChrome)
        chrome.storage.local.get(settingName, callback)
    else
        browser.storage.local.get(settingName).then(callback)
}