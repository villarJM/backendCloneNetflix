const modelsCloneNetflix = {
    queryCheckUser: `SELECT * FROM Users WHERE Email = ?`,
    queryCheckAllUser: `SELECT * FROM Users`,
    queryRegisterUser: `INSERT INTO Users (IDS, Email, Pass, Phone, Active) VALUES (?, ?, ?, ?, ?)`,
    queryCheckProfile:`SELECT a.Name FROM Profile a INNER JOIN Users b ON a.IDUsr = b.ID WHERE Name = ? AND Email = ?`,
    queryRegisterProfile: `INSERT INTO Profile (IDUsr, Name, UnderAge, Active) VALUES (?, ?, ?, ?)`,
    queryCheckUserID:`SELECT ID FROM Users WHERE Email = ? AND Pass = ?`,
    queryCheckGender: `SELECT Gender FROM Genders WHERE Gender = ?`,
    queryCheckAllGender: `SELECT * FROM Genders`,
    queryRegisterGender: `INSERT INTO Genders (Gender, Active) VALUES (?, ?)`,
    queryCheckSerie: `SELECT Name FROM Series WHERE Name = ?`,
    queryRegisterSerie: `INSERT INTO Series (Name, Description, Gender, Year, Active) VALUES (?, ?, ?, ?, ?)`,
    queryCheckMovie: `SELECT Name FROM Movies WHERE Name = ?`,
    queryRegisterMovie: `INSERT INTO Movies (Name, Description, Year, Genders, Active) VALUES (?, ?, ?, ?, ?)`,
    queryCheckAllSeries: `SELECT s.Name, s.Description, s.Gender, s.Year, se.Season, se.NameSeason, e.Episode, e.NameEpisode FROM Series s JOIN Seasons se ON s.IDSea = se.ID JOIN Episodeo e ON e.ID = se.IDE`,
    queryCheckAllMovies: `SELECT * FROM Movies`,
    queryCheckAccount: `SELECT Name FROM Account WHERE Name = ? AND CardNumber = ?`,
    queryRegisterAccount: `INSERT INTO Account (Name, CardNumber, ExpirationDateMonthYear, SecurityCode, Active) VALUES (?, ?, ?, ?, ?)`,
    queryCheckAllAccount: `SELECT * FROM Account`,
    queryEditAccount: `UPDATE Account SET CardNumber = ?, ExpirationDateMonthYear = ?, SecurityCode = ?, Active = ? WHERE Name = ?`,
    queryCheckSubs: `SELECT * FROM Subscriptions`,
    queryCheckTypeSubs:`SELECT s.ID FROM Subscriptions s JOIN SubLevel l ON s.IDLev = l.ID WHERE Level = ?`,
    queryDisableUserID: `UPDATE Users SET Active = 'N' WHERE ID = ?`,

}
const querySearch = (Search) => {
    return `SELECT * FROM Series WHERE Name LIKE '%${Search}%'`
}
module.exports = {modelsCloneNetflix, querySearch}