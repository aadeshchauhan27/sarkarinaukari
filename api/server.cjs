const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));

const jobsDir = path.join(__dirname, '../src/content/jobs');
const categoriesFile = path.join(__dirname, '../src/content/categories.json');

// Helper: Ensure jobs directory exists
if (!fs.existsSync(jobsDir)) {
  fs.mkdirSync(jobsDir, { recursive: true });
}

// Helper: Ensure categories file exists
if (!fs.existsSync(categoriesFile)) {
  fs.writeFileSync(categoriesFile, JSON.stringify(["latest-jobs", "admit-cards", "results", "syllabus"]));
}

// Add a new post (Markdown)
app.post('/add-post', (req, res) => {
  const { slug, frontmatter, content } = req.body;
  if (!slug || !frontmatter || !content) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  // Write ISO date strings without quotes in frontmatter, only for lastDate and publishedAt
  const md = `---\n${Object.entries(frontmatter).map(([k, v]) => {
    if (
      (k === 'lastDate' || k === 'publishedAt') &&
      typeof v === 'string' &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(v)
    ) {
      return `${k}: ${v}`;
    }
    return `${k}: ${JSON.stringify(v)}`;
  }).join('\n')}\n---\n\n${content}\n`;
  const filePath = path.join(jobsDir, `${slug}.md`);
  fs.writeFile(filePath, md, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to write file.' });
    res.json({ success: true });
  });
});

// Get categories
app.get('/categories', (req, res) => {
  fs.readFile(categoriesFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read categories.' });
    res.json(JSON.parse(data));
  });
});

// Add a category
app.post('/add-category', (req, res) => {
  const { category } = req.body;
  if (!category) return res.status(400).json({ error: 'Category required.' });
  fs.readFile(categoriesFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read categories.' });
    let cats = JSON.parse(data);
    if (!cats.includes(category)) cats.push(category);
    fs.writeFile(categoriesFile, JSON.stringify(cats, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to write categories.' });
      res.json({ success: true });
    });
  });
});

// Remove a category
app.post('/remove-category', (req, res) => {
  const { category } = req.body;
  if (!category) return res.status(400).json({ error: 'Category required.' });
  fs.readFile(categoriesFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read categories.' });
    let cats = JSON.parse(data);
    cats = cats.filter(c => c !== category);
    fs.writeFile(categoriesFile, JSON.stringify(cats, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to write categories.' });
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
}); 