| Language | Framework | Platform | Author |
| -------- | --------- |----------|--------|
| Nodejs | Express | Azure Web App, Virtual Machine| |

# Nodejs Express web application

Dynamic routing Nodejs Express web application built using Visual Studio Code.

## Installation

1. Clone repository to local directory
2. Run command `npm install` to install the framework libraries
3. Deploy a MySQL database via script `create_db.sql`
4. Set environment variables via file `.env` 

## Start

- Run command `npm start` or `node app` to start the application
- Run command `npm test` to test the application (for demo only)

## Environment variables

Set app variables through the `.env` file (using dotnet-env library) as a `key=value` pair.

| Key | Description |
| --- | ----------- |
| useAuth | Boolean value to configure application to use oAuth authentication |
| db_host | Database host name e.g. *localhost* |
| db_user | Database login username |
| db_password | Database login password |
| database | Database name. After executing the deploy script i.e. *test* |

## Views
*Use Case diagram:*
![Use Case Diagram](/doc/UseCase_Diagram.png)

*Component diagram:*
![Component Diagram](/doc/Component_Diagram.png)

## License:

See [LICENSE](LICENSE).

## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
