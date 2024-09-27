import { BodyTitle } from "../../components/BodyTitle";
import { DataAccordion } from "../../components/DataAccordion";
import { FilterPanel } from "../../components/FilterPanel";
import { SearchResults } from "../../components/SearchResults";

export function PostGraduateProgram() {
  return (
    <>
      <BodyTitle />
      <FilterPanel />
      <SearchResults />
      <DataAccordion />
    </>
  )
}