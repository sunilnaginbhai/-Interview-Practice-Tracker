const exportQuestions = (questions, filename = `interview-questions-${new Date().toISOString().slice(0, 10)}.json`) => {
  const blob = new Blob([JSON.stringify(questions, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

const parseImportedQuestions = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!Array.isArray(parsed)) throw new Error("Expected a question array");
        const valid = parsed.filter(
          (item) =>
            item &&
            typeof item.title === "string" &&
            typeof item.category === "string" &&
            typeof item.difficulty === "string"
        );
        resolve(valid);
      } catch {
        reject(new Error("That file is not a valid question export."));
      }
    };
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsText(file);
  });

export { exportQuestions, parseImportedQuestions };
