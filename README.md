# Zameen Dashboard

Zameen Dashboard is a property listing application that allows users to explore and search for various properties. The dashboard includes features such as viewing total properties, property listings, featured properties, and similar properties. Users can also refine their search using multiple filters to find specific types of properties.

# Features

1. Total Properties: View the total number of properties available.
2. Property Listings: Browse through the list of all properties.
3. Featured Properties: Highlighted properties for quick access.
4. Similar Properties: Find properties similar to a selected one.
5. Search Filters: 6. Select City 7. Search Bar 8. Price Range 9. Area 10. Number of Beds 11. Property Type (home, plots, commercial, etc.)

# Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

# Installation

1. Clone the repository:
2. git clone https://github.com/your-username/project.git
3. Navigate to project directory:
4. Navigate to project directory cd project-name.
5. Install dependencies:
   - npm install
6. To run the program locally. Run the command:
   - npm run dev

- Using Docker and nginx:

1. Build react app for production:
   - npm run build
2. Create a file named "Dockerfile" in the root of your project
3. Create nginx.conf in the root of your project
4. Build the Docker image using the Dockerfile:
   - docker build -t project-name
5. Run the Docker container using the image you just built:
   - docker run -p 80:80 project-name
6. Access your application by going to browser and go to "http://localhost/". You should see your React app running.

Github Actions:

1. A deploy.yml file is included for automated deployment using GitHub Actions. Ensure you have configured the necessary secrets and settings in your GitHub repository

# Usage

1. Find the number of properties listed on front page.
2. To view properties, navigate through the dashboard.
3. Use the search filters to find specific properties based on your criteria
4. User will be able to view the total number of properties available.
5. User can also see featured properties.
6. User can also view properties similar to a selected one.
7. User can also see the price Index graph and Trends graph.
8. Map functionality is also added to view the pinpoint location of the property.

# Contribution

Thank you for considering contributing to this project!

## How to contribute

- Fork the repository.
- Create a new branch.
- Commit your changes.
- Push to your branch.
- Create a pull request.

# Acknowledgements

[Asim Ghaffar](https://github.com/Mr-AsimGhaffar)
[Mohammad Abdullah](https://github.com/Muhammad-Abdullah012)
[Kashi Khan](https://github.com/kashikhan1)

# Contact

If you have any questions or suggestions, feel free to open an issue or contact the project maintainer at
[asim.ghaffar71@gmail.com], [not.muhammad.abdullah68@gmail.com]
