import React, { useEffect, useState } from 'react'
import SkeletonList from '../../../layout/feedback/SkeletonList'
import { Tag } from 'antd'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'


const Relationships = ({companies}) => {
  const [relationships, setRelationships] = useState([])

  const clickRemoveCompany = (id) => {
    console.log(id)
  }

  
  useEffect(() => {
    setRelationships(companies)
    console.log(companies)
  }, [companies])

  return (
      <>
      {
        (    <>
      {
        !relationships ?
        ( <SkeletonList  rows={4} paragraphs={4} /> )
        :
        (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="hide-md">Address</th>
                  <th className="hide-md">Phone</th>
                  <th className="hide-md">Type</th>
                  <th className="hide-md text-center">Active</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {relationships && relationships.map((company)=>{
                  return (
                    <tr key={company._id}>
                      <td>{company.name}</td>
                      <td className="hide-md">{(
                          <> 
                            {company && company.companyaddress && company.companyaddress.address && company.companyaddress.address} <br/> 
                            {`${company && company.companyaddress && company.companyaddress.city &&company.companyaddress.city}, ${company && company.companyaddress && company.companyaddress.state && company.companyaddress.state} ${company && company.companyaddress && company.companyaddress.zip && company.companyaddress.zip}`}
                          </>
                        )}
                      </td>
                      <td className="hide-md">{company && company.contact && company.contact.phone && company.contact.phone}</td>
                      <td className="hide-md">{
                        <>
                          <Tag color="blue">{company && company.companytype && company.companytype.name}</Tag>
                          <Tag>{company && company.companytype && company.companytype.level}</Tag>
                        </>}
                      </td>
                      <td className="hide-md text-center">{(
                          company.isactive? 
                            <Tag color="magenta">Active</Tag>
                            : 
                            <Tag color="volcano">InActive</Tag>
                        )}
                      </td>
                      <td className="text-center">{(
                        <DeleteButton confirmDelete={(e)=> clickRemoveCompany(company._id)} itemName="Event"/>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )
      }
    </>)
      }
    </>
  
  )
}

export default Relationships
