# Notifications

used local notifications and not push notifications [obviosuly cuz MVP or any future version doesn't need a server sending any data]

# Data Stucture for the App

```
|--- AsyncStorage
| |
| |--- streak: number
| |--- streakFreezes: number
| |--- onboard: boolean
| |--- morningTime: Date
| |--- eveningTime: Date
|
|--- SQLite
| |
| |--- Adventure Store
| |   | Date | Adventures | Completed |
| |
| |--- Memories Store
| |   | Date | Memory |
```
