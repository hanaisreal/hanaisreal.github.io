import React, { useState, useEffect } from 'react';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  tags: string[];
}

interface FilterState {
  tag: string;
  keyword: string;
}

function ProjectCard({ title, description, startDate, endDate, tags }: ProjectData) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200">
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{startDate} - {endDate}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

const Projects: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    tag: '',
    keyword: '',
  });
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);

  const projects: ProjectData[] = [
    {
      id: "1",
      title: "Infinite Healthcare Project",
      description: "DICOM Viewer with 3D segmentation capabilities.",
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      tags: ["Healthcare", "3D", "AI"]
    },
    {
      id: "2",
      title: "AI Autobiography Coordinator",
      description: "AI-powered autobiography creation for seniors.",
      startDate: "2024-03-15",
      endDate: "2024-07-15",
      tags: ["AI", "Seniors", "Writing"]
    },
    {
      id: "3",
      title: "Essay Curation Service",
      description: "Personalized essay writing using web data.",
      startDate: "2024-05-01",
      endDate: "2024-08-01",
      tags: ["Writing", "API", "Web Crawling"]
    }
  ];

  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

  useEffect(() => {
    const filtered = projects.filter(project => {
      const matchesTag = filters.tag === '' || project.tags.includes(filters.tag);
      const matchesKeyword = filters.keyword === '' || 
        project.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.keyword.toLowerCase());
      return matchesTag && matchesKeyword;
    });
    setFilteredProjects(filtered);
  }, [filters, projects]);

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Projects</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select 
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onChange={(e) => handleFilterChange('tag', e.target.value)}
          value={filters.tag}
        >
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onChange={(e) => handleFilterChange('keyword', e.target.value)}
          value={filters.keyword}
        />
      </div>
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;