# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

# Tools and Architecture






# How to 
## How to upload data via with Sanity CLI and a custom import script

### Step 1: Get Sanity artifacts

- **Get write token**
    - Go to sanity.io/manage → your project → API → Tokens
    - Create new token with Write permissions

- **Get Sanity project ID**
    - found in sanity.json or project settings

### Step 2: Convert Excel to CSV
- Save your Excel sheet as CSV format
- Put your CSV file in the same directory as your import script.

File structure should look like:
```
your-sanity-project/
├── sanity.config.js
├── package.json
├── import-products.js        ← Your import script
├── products.csv              ← Your CSV file here
└── other-sanity-files/
```

Your CSV format should match:
```csv
title,slug,description,categoryId,brandId,relatedPlayerId,relatedTeamId,relatedLeagueId,colors,tags,isSignature,isFeatured
"Nike Jersey","nike-jersey-1","Cool jersey",1,2,15,3,1,"red,white","jersey,nike",false,true
```

### Step 3: Create import script
- In your Sanity project, create `import-products.js`:
- Use `import-script-template.js` as a template
- This script can be used for initial product additions or subsequent batches because it checks for dupes



### Step 4: Install Sanity CLI
```bash
npm install -g @sanity/cli
```

**Step 5: Run the script**
```bash
node import-products.js
```
